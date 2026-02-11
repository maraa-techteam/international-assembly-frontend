import { TimeZones } from '../components/GroupSchedule/GroupSchedule.type'

export type GroupType = {
  id?: string
  name: string
  description: string
  country: string
  presence: string
  digital_address: string
  address: string
  website: string
  youtube: string
  telegram: string
  contact: { name: string; phone: string; email: string }[]
  schedule_slots: { day: string; time: string }[]
  time_zone: TimeZones
  slug: string
}
