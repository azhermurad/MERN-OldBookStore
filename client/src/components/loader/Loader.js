const Loader = ({ items = 3, style }) => {
    return (
        <div className='text-center'>
            {items
                ? [...Array(items).keys()].map((i) => (
                      <div
                          className='spinner-grow'
                          key={i}
                          style={style}
                          role='status'
                      ></div>
                  ))
                : null}
        </div>
    );
};
export default Loader;
