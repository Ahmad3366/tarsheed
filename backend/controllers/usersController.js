exports.loginAdmin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const admin = await Admin.findOne({ username });
		if (!admin) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		if (admin.password !== password) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		res.json({ message: 'Login successful', adminId: admin._id });
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
}