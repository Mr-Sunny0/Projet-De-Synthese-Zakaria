

export default function Sidebar(){

    return(
        <>
        <div className="navigation">
        <ul>
          <li>
            <a href="/">
              <span className="icon">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                <span className="material-symbols-outlined">monetization_on</span>
              </span>
              <span className="title">Finance Dashboard</span>
            </a>
          </li>

          <li>
            <a href="/">
              <span className="icon">
                <span className="material-symbols-outlined">dashboard</span>
              </span>
              <span className="title">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/">
              <span className="icon">
                <span className="material-symbols-outlined">receipt_long</span>
              </span>
              <span className="title">Transactions</span>
            </a>
          </li>

          <li>
            <a href="/">
              <span className="icon">
                <span className="material-symbols-outlined">trending_up</span>
              </span>
              <span className="title">Incomes</span>
            </a>
          </li>

          <li>
            <a href="/">
              <span className="icon">
                <span className="material-symbols-outlined">trending_down</span>
              </span>
              <span className="title">Expenses</span>
            </a>
          </li>

          <li>
            <a href="/">
              <span className="icon">
                <span className="material-symbols-outlined">logout</span>
              </span>
              <span className="title">Logout</span>
            </a>
          </li>
        </ul>
      </div>
        </>
    )
}