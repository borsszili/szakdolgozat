
export async function createService(data: {
    name: string
    price: string
    description: string
}) {
    console.log("Creating service:", data)

    // Simulate a delay and potential error
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (Math.random() < 0.3) {
        throw new Error("Random service creation error")
    }

    return { success: true }
}

