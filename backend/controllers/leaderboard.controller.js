import User from '../models/User.model.js'
export const leaderboardController =async  (req,res) => {
try {
    const leaderboard = await User.find().limit(25).sort({points:-1})
    res.json(leaderboard)
} catch (error) {
    console.log(error)
    res.status(500).json({message:error})
}
    
}
