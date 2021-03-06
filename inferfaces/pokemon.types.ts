export type ResourceNameURI = {
  name: string;
  url: string;
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: ResourceNameURI;
};

export type Ability = {
  ability: ResourceNameURI;
  is_hidden: boolean;
  slot: number;
};

export type PokemonRef = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  id: number;
  height: number;
  weight: number;
  abilities: Ability[];
  base_experience: number;
  forms: ResourceNameURI[];
  stats: Stat[];
  moves?: [];
  species?: [];
  sprites?: {
    front_default: string;
  };
  favourite?: boolean;
};

declare global {
  interface Window {}
}
