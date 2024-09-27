import { BlogPreview } from '@/components/elements/BlogPreview/BlogPreview';
import { BlogType } from '@/helpers/types';

export const FeaturedBlogs: React.FC<{ data: Array<BlogType> }> = ({
  data,
}) => {
  return (
    <section>
      <div className="container grid lg:grid-cols-12 gap-10 pt-10">
        <div className="lg:col-span-7">
          <BlogPreview data={data[0]} featured={true} aspectRatio="3/2" />
        </div>
        <div className="lg:col-span-5 flex flex-col gap-y-10">
          {data.slice(1, 4).map((item) => (
            <BlogPreview
              key={item.id}
              data={item}
              layout="horizontal"
              featured={true}
              aspectRatio="square"
            />
          ))}
        </div>
      </div>
    </section>
  );
};
