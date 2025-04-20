import axios from 'axios'
import SousanneLayout from '@components/layout/SousannePage'
import { Link } from 'el-cuc-ui'
const MainPage: NextPage<RecipesProps> = () => {
  return (
    <SousanneLayout>
      <main>
        <h1>Sousanne</h1>
        <Link type="navigation">Price Book</Link>
        <Link type="navigation" href="/recipes">
          Recipes
        </Link>
        <Link href="/ingredients" type="navigation">
          Ingredients
        </Link>
      </main>
    </SousanneLayout>
  )
}

export default MainPage
