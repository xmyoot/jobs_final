import axios from 'axios'
import * as cheerio from 'cheerio';
import connectDB from '../../database/connect.js'
import Jobs from '../../models/jobSchema.js'
import puppeteer from 'puppeteer'


const getPageJobs = async () => {
    try {
        let companyLogo, allJobs = [], start = 1, resultCount = 4, resultTracker = 0
        const browser = await puppeteer.launch( { headless: true } )


        while( resultCount > 0 ) {
            let url = `https://www.monster.com/jobs/search?q=Junior+Developer&where=&page=${start}&et=REMOTE&recency=today&so=m.s.sh`
            console.log(url)
            const page = await browser.newPage()
            await page.goto(url)
            await page.waitForTimeout(2000)
            const content = await page.content()
            const $ = cheerio.load(content)
            const jobs = $('[data-testid="svx_jobCard"]')
            // resultCount = jobs.length
            console.log(`I just fetched ${jobs.length} jobs!`)
            
            let jobObjects = jobs.map((i, e)=> {
                let job = $(e)
                let position = job.find('[data-test-id="svx-job-title"]').text().trim() || ''
                let company = job.find('[data-test-id="svx-job-company"]').text().trim() || ''
                let location = job.find('[data-test-id="svx-job-location"]').text().trim() || ''
                let salary = job.find('[data-test-id="svx-job-salary-range"]').text().trim() || ''
                let jobUrl = job.attr('href')
                let logoString = job.find('[data-test-id="svx-job-logo"]').attr('src') || ''
                logoString.includes('http') ? companyLogo = logoString : companyLogo = ''
                return {
                    position: position,
                    company: company,
                    location: location,
                    salary: salary,
                    companyLogo: companyLogo,
                    jobUrl: `https:${jobUrl}`
                }
            }).get()

            allJobs.push(...jobObjects)
            start++
            resultCount--
        }


        await browser.close()
        return allJobs
        
    } catch (error) {
        console.error(error)
    }
}

const fetchMonster = async () => { 
    try {
        const fetchedJobs = await getPageJobs()
        console.log(fetchedJobs)
        console.log(`Length of fetched jobs: ${fetchedJobs.length}`)
        // connectDB()
        // const filteredJobs = []
        // for (const job of fetchedJobs){
        //     let position = job.position.toLowerCase()
        //     if (
        //         !position.includes('senior') ||
        //         !position.includes('manager') ||
        //         !position.includes('sr.') ||
        //         !position.includes('sr') ||
        //         !position.includes('architect') ||
        //         !position.includes('director')
        //         ) {
        //             filteredJobs.push(job)
        //         }
        // }
        // console.log(filteredJobs)
        // console.log(`Unfiltered Jobs length: ${fetchedJobs.length}`)
        // console.log(`Filtered Jobs length: ${filteredJobs.length}`)
        process.exit(0)
    } catch (error) {
        console.error(error)
    }
 }
 fetchMonster()
 export default fetchMonster