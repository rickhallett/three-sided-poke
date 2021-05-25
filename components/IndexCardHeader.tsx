const IndexCardHead = ({pokemon}) => {
  return (
    <div className="flex justify-between p-3">
      <div className="text-gray-600 tracking-wider">
        {pokemon ? pokemon.name : null}
      </div>
      <div className="text-3xl font-bold text-blue-300">
        #{pokemon ? pokemon.id : null}
      </div>
    </div>
  );
}

export default IndexCardHead;