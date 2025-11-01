import User from '../models/User.model.js'
export const leaderboardUsers =async  (req,res) => {
try {
    const leaderboard = await User.find().limit(10).sort({reputationPoints:-1})
    console.log(leaderboard);
    
    res.status(200).json(leaderboard)
} catch (error) {
    console.log(error)
    res.status(500).json({message:error})
}
    
}
