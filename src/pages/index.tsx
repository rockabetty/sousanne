import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
    const response = await axios.get(`${NEXT_PUBLIC_API_URL}/api/ingredients`);
    return {
      props: {
        ingredients: response.data || []
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        ingredients: ["error!"]
      },
    };
  }
};

interface IngredientProps {
  ingredients: any[];
};

const Ingredients: NextPage<IngredientProps> = ({ ingredients }) => {
  return (
    <div>
      <h1>Ingredients</h1>
      {ingredients?.map(ingredient => (
        <div key={ingredient.id}>{ingredient.name}</div>
      ))}
    </div>
  )
};

export default Ingredients;