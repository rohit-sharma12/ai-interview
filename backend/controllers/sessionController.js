const Session = require('../models/Session')
const Question = require('../models/Question')

exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id; 

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description
        });

        const questionDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );
        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
};

exports.getMySessions = async (req, res) => {
    try {
        // Use _id for consistency
        const sessions = await Session.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('questions');
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
};

exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findOne({ _id: req.params.id, user: req.user._id })
            .populate({
                path: 'questions',
                options: { sort: { isPinned: -1, createdAt: 1 } },
            })
            .exec();

        if (!session) {
            return res
                .status(404)
                .json({ success: false, message: 'Session not found' })
        }
        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
};

exports.deleteSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);

        if (!session) {
            return res.status(404).json({ success: false, message: 'Session not found' })
        }

        if (session.user.toString() !== req.user._id.toString()) {
            return res
                .status(401)
                .json({ success: false, message: 'Not authorized to delete this session' });
        }
        await Question.deleteMany({ session: session._id });

        await session.deleteOne();
        res.status(200).json({ success: true, message: 'Session deleted successfully' })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error' })
    }
};