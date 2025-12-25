export default defineNuxtRouteMiddleware((to, _from) => {
  const userToken = useCookie('token')

  if (!userToken.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (userToken.value && to.path === '/login') {
    return navigateTo('/')
  }
})
