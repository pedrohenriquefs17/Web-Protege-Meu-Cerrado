interface IGET {
    url: string
    params?: Record<string, string>
}

export class GETError extends Error {
    constructor(url: string) {
        super()
        this.message = `Failed to fetch ${url}`
    }
}

// TODO: assim que mudar para o servidor definitivo, mudar a url para uma constante fixa
const GET = async ({
    url,
    params
}: IGET) => {
    try {
        const queryParams = params ? '?' + new URLSearchParams(params).toString() : ""

        const completeUrl = url.concat(queryParams)

        const response = await fetch(completeUrl, {
            method: "GET"
        })

        if (!response.ok)
            throw new GETError(url)

        return await response.json()
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default GET