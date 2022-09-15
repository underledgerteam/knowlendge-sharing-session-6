interface NftImageInterface {
  name: string;
  imageUrl: string;
  description: string;
  dna: string;
  edition: string;
  date: string;
}

const NftImage = (props: NftImageInterface) => {
  const { name, imageUrl } = props;

  return (
    <div>
      <img
        src={imageUrl}
        alt={name}
        className="w-40"
      />
      {name}
    </div>
  );
};

export default NftImage;
