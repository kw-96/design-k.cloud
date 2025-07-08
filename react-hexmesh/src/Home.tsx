import styles from './Home.module.scss';

const projects = [
  {
    title: 'PyBegin',
    desc: '学习资源整合',
    link: '/PyBegin',
  },
  {
    title: 'RuleXcel',
    desc: '在线数据处理',
    link: '/RuleXcel',
  },
  {
    title: 'Design',
    desc: '个人设计作品',
    link: '/DesignDocs',
  },
];

const Home = () => (
  <div className={styles.home}>
    <div className={styles.homeBg}></div>
    <h1>Design-K Hub</h1>
    <p>人不应该像机器一样工作</p>
    <div className={styles.projects}>
      {projects.map((p) => (
        <div className={styles.projectCard} key={p.title}>
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
          <a
            href={p.link}
            style={{ color: '#a3d9ff', pointerEvents: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            访问项目
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Home; 