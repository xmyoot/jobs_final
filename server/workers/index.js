import { createRequire } from 'module'
import cron, { CronJob } from 'cron'
import fetchIndeed from './tasks/fetchIndeed.js'

const cronJob = cron.CronJob

new CronJob('* * * * *', fetchIndeed(), null, true, 'America/Los_Angeles')
