const request = require("request");
const cheerio = require("cheerio");

module.exports.query = function(queryObject) {
  const q = new Query(queryObject);
  return q.getJobs();
};

function Query(qo) {
  // query variables
  this.host = qo.host || "www.indeed.com";
  this.query = qo.query || "";
  this.city = qo.city || "";
  this.level = qo.level || "";
  this.maxAge = qo.maxAge || "";
  this.jobType = qo.jobType || "";
  this.sort = qo.sort || "";
  // this.excludeSponsored = qo.excludeSponsored || false;

  // internal variables
  this.start = 0;
  this.limit = Number(qo.limit) || 0;
}

Query.prototype.url = function() {
  let q = "https://" + this.host + "/jobs";
  q += "?q=" + this.query;
  q += "&l=" + this.city;
  q += "&fromage=" + this.maxAge;
  q += "&sort=" + this.sort;
  q += "&start=" + this.start;
  // q += "&sc=0kf%3Aexplvl" + "(" + this.level + ")";
  // q += "jt(" + this.jobType + ")%3B";
  console.log(q);
  return encodeURI(q);
};

/* Gets all the desired jobs for the city */
Query.prototype.getJobs = function() {
  // const excludeSponsored = this.excludeSponsored;
  return new Promise((resolve, reject) => {
    /* Recursive function that gets jobs until it can't anymore (Or shouldn't) */
    function getSomeJobs(self, jobs) {
      request(self.url(), (error, response, body) => {
        const parsed = parseJobList(body, self.host);
        jobs = jobs.concat(parsed.jobs);
        if (parsed.error !== null) {
          // Got an error so reject
          reject(Error);
        } else if (parsed.continue === true) {
          // If we reach the limit stop looping
          if (self.limit != 0 && jobs.length > self.limit) {
            while (jobs.length != self.limit) jobs.pop();
            resolve(jobs);
          } else {
            // Continue getting more jobs
            self.start += 10;
            getSomeJobs(self, jobs);
          }
        } else {
          // We got all the jobs so stop looping
          resolve(jobs);
        }
      });
    }
    getSomeJobs(this, []);
  });
};

/* Parses time and returns the date in YYYY-MM-DD form */
function parsePostDate(date) {
  //this date is used to replace the Just posted, Hiring ongoing dates
  const currentDate = new Date();

  if (date.includes(" days ago") || date.includes(" day ago")) {
    let daysSince = date.split(" ")[0];
    currentDate.setDate(currentDate.getDate() - daysSince);
    return currentDate.toISOString().substring(0, 10);
  }

  if (
    date.includes("Hiring ongoing") ||
    date.includes("Today") ||
    date.includes("Just posted")
  ) {
    return currentDate.toISOString().substring(0, 10);
  }
  return date;
}

/* Parses a page of jobs */
function parseJobList(body, host) {
  const $ = cheerio.load(body);
  const jobTable = $(".jobsearch-ResultsList");
  const jobs = jobTable.find(".slider_container");

  let cont = true;

  // Create objects
  const jobObjects = jobs
    .map((i, e) => {
      const job = $(e);

      const jobtitle = job
        .find(".jobTitle")
        .text()
        .trim()
        .replace("new", "");

      const url = "https://" + host + job.find(".jcs-JobTitle").attr("href");

      const summary = job
        .find(".job-snippet")
        .text()
        .trim()
        .replaceAll("\n", "");

      const company =
        job
          .find(".companyName")
          .text()
          .trim() || null;

      const location = job
        .find(".companyLocation")
        .text()
        .trim();

      const postDate = parsePostDate(
        job
          .find(".date")
          .text()
          .trim()
          .replace("Posted", "")
          .replace("EmployerActive ", "")
          .replace("Active", "")
      );

      const salary = job
        .find(".attribute_snippet")
        .eq(0)
        .text()
        .trim();

      const jobType = job
        .find(".attribute_snippet")
        .eq(1)
        .text()
        .trim();

      const shiftType = job
        .find(".attribute_snippet")
        .eq(2)
        .text()
        .trim();

      return {
        title: jobtitle,
        summary: summary,
        url: url,
        company: company,
        location: location,
        postDate: postDate,
        salary: salary,
        jobType: jobType,
        shiftType: shiftType
      };
    })
    .get();

  const list = $(".pagination");

  if (!list.length) {
    // No paging of results
    cont = false;
  } else {
    // Indeed returns two different types of html
    // In one the links are nested inside of a ul, on the other they are just
    // a list, not nested in anything
    // I believe the nested one is SSRed, and the other one is hydrated?  Aria stuff
    // is not set for flat, and it doesn't use semantic tags.
    const type = list.children().length > 1 ? "flat" : "nested";
    const buttons =
      type === "flat"
        ? list.children()
        : list
            .children()
            .first()
            .children();

    // We determine if this is the last page by checking if the button for the last page is active
    const activeButton =
      type === "flat"
        ? buttons.filter("b")
        : buttons.filter((_, e) => $(e).children("b").length > 0);
    const activeText = activeButton.text();
    const buttonTexts = Array.from(buttons.map((_, e) => $(e).text()))
      // Filter out buttons that aren't numbers (like next/prev)
      .filter(e => e !== "" && !Number.isNaN(Number(e)));
    const lastButtonText = buttonTexts[buttonTexts.length - 1];
    const isLastPage = lastButtonText === activeText;
    if (isLastPage) {
      // We have seen all the results
      cont = false;
    }
  }

  return {
    error: null,
    continue: cont,
    jobs: jobObjects
  };
}
