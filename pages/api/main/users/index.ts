import usersApi from "@framework/api/users";

const mock = (req, res) => {
  res.status(200).json({ data: [] });
};

// export default mock;
export default usersApi()
