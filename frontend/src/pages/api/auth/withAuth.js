import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (WrappedComponent, options = {}) => {
  return (props) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userData, setUserData] = useState(options.userData ? {} : null);

    useEffect(() => {
      // 여기에 로그인 상태 체크 로직을 구현합니다.
      if (status === "authenticated" && session) {
        console.log(session.user.name);
        const reversedName = session.user.name.split(' ').reverse().join('');
        setUserData({
          name: reversedName,
          email: session.user.email,
          // User관련 필요 데이터 추가
        });
      } else if (status === "loading") {
        return null;
      } else {
        router.push("/user/login");
      }
    }, [session, status, router]);

    // 로그인 상태가 확인되면 원래의 컴포넌트를 렌더링합니다.
    return status === "authenticated" && session ? (
      <WrappedComponent {...props} {...(options.userData && { userData })} />
    ) : (
      <div></div>
    );
  };
};

export default withAuth;
