/* eslint-env jest */

// Force garbage collection after each test
afterEach(() => {
  if (global.gc) {
    global.gc()
  }
})

// Force garbage collection after each test suite
afterAll(() => {
  if (global.gc) {
    global.gc()
  }
})

// Optional: Log memory usage for debugging
if (process.env.NODE_ENV === 'test') {
  const originalConsoleLog = console.log

  beforeEach(() => {
    if (process.env.DEBUG_MEMORY) {
      const memUsage = process.memoryUsage()
      originalConsoleLog(`Memory before test: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`)
    }
  })

  afterEach(() => {
    if (process.env.DEBUG_MEMORY) {
      const memUsage = process.memoryUsage()
      originalConsoleLog(`Memory after test: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`)
    }
  })
}
