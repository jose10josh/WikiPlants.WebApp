import { NavBar } from '@ui/NavBar'

export function Header() {
  return (
    <div className="mx-auto" style={{ maxWidth: '98%' }}>
      <NavBar title="🌿 WikiPlants">
        <div>{/* NavLink items */}</div>
      </NavBar>
    </div>
  )
}
