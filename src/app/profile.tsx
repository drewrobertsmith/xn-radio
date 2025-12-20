import { ActivityIndicator, Button, Platform, Text, View } from "react-native";
import { makeRedirectUri } from "expo-auth-session";
import { useAuthActions } from "@convex-dev/auth/react";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";
import { Image } from "expo-image";

const redirectTo = makeRedirectUri();

function SignIn() {
  const { signIn } = useAuthActions();
  const handleSignIn = async () => {
    const { redirect } = await signIn("google", { redirectTo });
    if (Platform.OS === "web") {
      return;
    }
    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);
    if (result.type === "success") {
      const { url } = result;
      const code = new URL(url).searchParams.get("code")!;
      await signIn("google", { code });
    }
  };
  return <Button onPress={handleSignIn} title="Sign in with Google" />;
}

function SignOut() {
  const { signOut } = useAuthActions();

  return (
    <View>
      <Button onPress={signOut} title="Sign Out" />
    </View>
  );
}

export default function Profile() {
  const user = useQuery(api.auth.currentUser);

  return (
    <View className="flex-1 justify-center items-center">
      <AuthLoading>
        <ActivityIndicator size="small" />
      </AuthLoading>
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <Image
          source={user?.image}
          contentFit="cover"
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
          }}
        />
        <Text>{user?.name}</Text>
        <Text>{user?.email}</Text>
        <SignOut />
      </Authenticated>
    </View>
  );
}
