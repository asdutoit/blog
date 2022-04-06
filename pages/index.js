// import fs from "fs";
// import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { getAllPostsWithSlug } from "../lib/api";

export async function getStaticProps() {
  // const files = fs.readdirSync("posts");
  const postsLive = await getAllPostsWithSlug();

  // const posts = files.map((fileName) => {
  const posts = postsLive.map((post) => {
    // const slug = fileName.replace(".md", "");
    // const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    // const { data: frontmatter } = matter(readFile);
    const slug = post.slug;
    return {
      slug,
      post,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {posts.map(({ slug, post }) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`/post/${slug}`}>
            <a>
              <Image
                width={650}
                height={340}
                alt={post.title}
                src={`${post.coverImage.url}`}
              />
              <h1 className="p-4">{post.title}</h1>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

// github tests
