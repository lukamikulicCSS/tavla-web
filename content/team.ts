/**
 * Tim. Za novog člana dodaj objekt u niz.
 * photo: putanja u /public (npr. "/team/luka.jpg"), prazno = monogram
 * bio / linkedin: prazno = ne prikazuje se
 */
export type TeamMember = {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
};

export const team: TeamMember[] = [
  { name: "Ante Spajić", role: "Suosnivač", photo: "", bio: "", linkedin: "" },
  { name: "Luka Mikulić", role: "Suosnivač", photo: "", bio: "", linkedin: "" },
];
