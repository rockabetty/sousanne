import axios from 'axios';
import slugify from 'slugify'
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/recipes`);
    
    const recipes = response.data.map(recipe => ({
      ...recipe,
      slug: slugify(recipe.name, { lower: true })
    }));

    return {
      props: {
        recipes: recipes || []
      },
    };

  } catch (error) {
    console.log(error);
    return {
      props: {
        recipes: ["error!"]
      },
    };
  }
};

interface RecipesProps {
  recipes: any[];
};

const Recipes: NextPage<RecipesProps> = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
      {recipes?.map(recipe => (
        <li key={recipe.id}><Link href={`/recipes/${recipe.slug}`}>{recipe.name}</Link></li>
      ))}
      </ul>
    </div>
  )
};

export default Recipes;