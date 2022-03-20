import Animation from '../../components/animation/index';
import Less from './index.less';
const content = `THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY`;
function AnimationTest() {
  return (
    <>
      <div className={Less['animation']}>
        <div className="shadow-2xl p-8 max-w-md">
          <Animation content={content} />
        </div>
      </div>
    </>
  );
}

export default AnimationTest;
