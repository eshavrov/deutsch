import { GetUserIdQuery } from "../../schema";
import { MainConfig, getConfig } from "..";

export const getUserIdQuery = /* GraphQL */ `
  query getUserId {
    user {
      entityId
    }
  }
`;

async function getUserId({
  userToken,
  config,
}: {
  userToken: string;
  config?: MainConfig;
}): Promise<number | undefined> {
  config = getConfig(config);

  const { data } = await config.fetch<GetUserIdQuery>(
    getUserIdQuery,
    undefined,
    {
      headers: {
        cookie: `${config.userCookie}=${userToken}`,
      },
    }
  );

  return data?.user?.entityId;
}

export default getUserId;
