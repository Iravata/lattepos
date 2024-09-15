import router from '@/router'
import { createResource } from 'frappe-ui'

export const userResource = createResource({
  url: 'frappe.auth.get_logged_user',
  cache: 'User',
  onSuccess(data){
    console.log('userResource', data)
  },
  onError(error) {
    if (error && error.exc_type === 'AuthenticationError') {
      router.push({ name: 'Login' })
    }
  },
})
