import usePayload from '@/hooks/usePayload'

export default async function useStudentTeams(studentId: string) {
  const { payload } = await usePayload()
  const res = await payload.find({
    collection: 'teams',
    where: {
      'team.student': { equals: studentId },
    },
    select: { name: true, team: true },
    depth: 2,
  })

  const teams = res.docs.map((team) => {
    const myTeamEntry = team.team?.find((member) =>
      typeof member.student === 'string'
        ? member.student === studentId
        : member.student?.id === studentId,
    )
    return {
      name: team.name,
      role: myTeamEntry?.role,
      startDate: myTeamEntry?.startDate,
      endDate: myTeamEntry?.endDate,
    }
  })

  teams.sort((a, b) => {
    // If both are present positions (no endDate), sort by startDate descending
    if (!a.endDate && !b.endDate) {
      return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime()
    }
    // If only a is present
    if (!a.endDate) return -1
    // If only b is present
    if (!b.endDate) return 1
    // Both have endDate, sort by endDate descending, then startDate descending
    const endDateComparison = new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    if (endDateComparison !== 0) return endDateComparison
    return new Date(b.startDate || '').getTime() - new Date(a.startDate || '').getTime()
  })

  return teams
}
