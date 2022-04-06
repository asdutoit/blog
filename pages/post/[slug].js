// import fs from "fs";
// import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import markdownItVideo from "markdown-it-video";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";

const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (err) {
        console.log(err);
      }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
}).use(markdownItVideo, {
  youtube: { width: 640, height: 390 },
  vimeo: { width: 500, height: 281 },
  vine: { width: 600, height: 600, embed: "simple" },
  prezi: { width: 550, height: 400 },
});

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  const paths = allPosts.map((p) => ({ params: { slug: p.slug } }));
  // const files = fs.readdirSync("posts");
  // const paths = files.map((fileName) => ({
  //   params: {
  //     slug: fileName.replace(".md", ""),
  //   },
  // }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug }, preview = null }) {
  // const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  // const { data: frontmatter, content } = matter(fileName);
  const data = await getPostAndMorePosts(slug, preview);
  const content = data?.posts[0]?.content || "";
  return {
    props: {
      // frontmatter,
      content,
    },
  };
}

export default function PostPage({ content }) {
  return (
    <div className="prose mx-auto ">
      <div
        dangerouslySetInnerHTML={{
          __html: md.render(content),
        }}
      />
    </div>
  );
}

// Test on Github
