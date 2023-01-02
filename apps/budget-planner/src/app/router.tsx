import {Link, Route, Routes as RoutesComponent } from 'react-router-dom'
import { List } from '@chupachap/basic-components'
import { Home } from './screens/Home'

export const Routes = () => {
  return (
    <RoutesComponent>
      <Route
        path="/"
        element={<Home/>}
      />
      <Route
        path="/page-2"
        element={
          <div>
            <Link to="/"><List list={[]} onPressItem={(id) => console.log(id)}/></Link>
          </div>
        }
      />
    </RoutesComponent>
  )
}