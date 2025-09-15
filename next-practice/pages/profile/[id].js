export async function getStaticPaths() {
  const response = await fetch("http://localhost:8080/students");
  const data = await response.json();

  const paths = data.map((d) => {
    return {
      params: {
        id: d._id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const response = await fetch(`http://localhost:8080/students/${params.id}`);
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}

export default function StudentProfile({ data }) {
  return (
    <div>
      <h1>學生名稱：{data.name}</h1>
      <h1>學生ID：{data._id}</h1>
      <h1>學生年齡：{data.age}</h1>
      <h1>merit獎學金：{data.scholarship.merit}</h1>
      <h1>other獎學金：{data.scholarship.other}</h1>
    </div>
  );
}
