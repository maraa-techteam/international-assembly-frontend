import { TimeZones } from '../components/GroupSchedule/GroupSchedule.type'

/**
 * One entry of a group's `contact` repeater.
 *
 * `name` and `phone` are required in the CMS; `email` and `telegram` were added
 * later and are optional, so neither is guaranteed to be present.
 */
export type GroupContact = {
  name: string
  phone?: string
  email?: string
  telegram?: string
}

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
  contact: GroupContact[]
  schedule_slots: { day: string; time: string }[]
  time_zone: TimeZones
  slug: string
}
