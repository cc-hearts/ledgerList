import Code from '../../components/code/index';
interface props {}
const CodePage: React.FC<props> = function (props) {
  return (
    <>
      <Code>
        <div style={{ width: '100px' }} className="code-page">
          content
        </div>
      </Code>
    </>
  );
};

export default CodePage;
