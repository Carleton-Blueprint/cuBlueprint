import type { JoinFieldServerProps } from 'payload'
import useStudentTeams from '../hooks/useStudentTeams'

export default async function TeamHistory({ payload, data }: JoinFieldServerProps) {
  const studentId = data.id as string
  const teams = await useStudentTeams(studentId)

  return (
    <>
      <p>Team History</p>
      <div className="table-container">
        <table className="team-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Position</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.name}</td>
                <td>{team.role}</td>
                <td>
                  {team.startDate ? new Date(team.startDate).toLocaleDateString() : 'No start date'}
                </td>
                <td className={team.endDate ? '' : 'current-status'}>
                  {team.endDate ? new Date(team.endDate).toLocaleDateString() : 'Present'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
