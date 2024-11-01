export default defineEventHandler(async () => {
    // Wait 3 seconds then return
    await new Promise((resolve) => setTimeout(resolve, 3000))
    //console.log('Hello from server')
    return Math.random()
})