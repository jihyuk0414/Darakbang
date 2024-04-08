import PostsGrid from './posts-grid';

import styles from './commu-post.module.css'

export default function CommuPosts( props ) {
  return (
    <section className={styles.sections}>
      <PostsGrid posts={props.posts} accessToken={props.accessToken} selectedCategory={props.selectedCategory}/>
    </section>
  );
}

