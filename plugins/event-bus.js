import { EventBus } from 'assets/utils/event-bus'

export default (context, inject) => {
  inject('bus', EventBus)
}
