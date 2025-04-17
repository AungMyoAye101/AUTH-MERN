export const register = async (req, res) => {
    try {

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}
export const login = async (req, res) => {
    try {

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}
export const logout = async (req, res) => {
    try {

        return res.status(200).json({ success: true, message: "success" })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}