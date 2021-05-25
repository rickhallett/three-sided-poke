export const IndexCardSprite = ({ pokemon }) => {
  return (
    <img
      src={`/images/sprites/${pokemon ? pokemon.id : null}.png`}
      width={150}
      className="mx-auto"
    ></img>
  );
};
