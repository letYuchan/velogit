interface PostInputData {
  title: string;
  date: string;
  tags?: string[];
  summary: string;
  thumbnail?: string;
  content?: string;
  category: string;
}

type PostInputDataWithoutTags = Omit<PostInputData, 'tags'>;
