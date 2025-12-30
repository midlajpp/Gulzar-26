export const addParticipant = async (req, res) => {
  const { name, category, team } = req.body;

  const categories = new Set([
    category, // selected category
    "General", // auto
    "Group", // auto
  ]);

  const participant = await Participant.create({
    name,
    category: Array.from(categories),
    team: { name: team },
  });

  res.json(participant);
};
