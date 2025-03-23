import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/recipes`);
    return {
      props: {
        recipes: response.data || []
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

const Recipes: NextPage<IngredientProps> = ({ recipes }) => {
  return (
    <div>
      <h1>Recipes</h1>
      {recipes?.map(recipe => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
    </div>
  )
};

export default Recipes;