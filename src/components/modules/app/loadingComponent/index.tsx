// components/LoadingStates.tsx
interface TableLoadingSkeletonProps {
  rows?: number;
  columns?: number;
}
  
export function TableLoadingSkeleton({ rows = 4, columns = 4 }: TableLoadingSkeletonProps) {
  return (
    <div className="table-loading">
      <div className="heading-placeholder"></div>
      <table className="striped-table">
        <tbody>
          <tr className="header-row">
            {Array(columns).fill(0).map((_, index) => (
              <th key={index} className="loading-cell"></th>
            ))}
          </tr>
          {Array(rows).fill(0).map((_, row) => (
            <tr key={row}>
              {Array(columns).fill(0).map((_, col) => (
                <td key={col} className="loading-cell"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}