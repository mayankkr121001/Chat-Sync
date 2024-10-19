import cron from 'node-cron'
import { User } from '../../models/user.model.js'

cron.schedule('0 * * * *', async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    try {
        const userWithExpiredStoryFind = await User.find(
            {storyCreatedTime: { $lt: cutoff }}
        )

        for (const user of userWithExpiredStoryFind) {
            if (user.story) {
                const publicId = user.story.split('/').pop().split('.')[0];
                await deleteFromCloudinary(publicId);
            }
        }
        
        const userWithExpiredStory = await User.updateMany(
            { storyCreatedTime: { $lt: cutoff } },
            {
                $unset: {
                    story: 1,
                    storyCreatedTime: 1,
                },
                $set: {
                    storySeen: false,
                }

            }
        )


        console.log(`Updated ${userWithExpiredStory.modifiedCount} users.`);
    } catch (error) {
        console.error('Error deleting expired stories:', error);
    }
})