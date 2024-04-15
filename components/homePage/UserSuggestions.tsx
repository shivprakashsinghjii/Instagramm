import Image from 'next/image';
import { useAtom } from 'jotai';
import Link from 'next/link';
import atoms from '../../util/atoms';
import LoadingSuggestions from '../loadingComps/LoadingSuggestions';
import ProfilePicSVG from '../svgComps/ProfilePicSVG';

function UserSuggestions() {
  const [userDetails] = useAtom(atoms.userDetails);
  const [spotlightUsers] = useAtom(atoms.spotlightUsers);
  const [suggestionsLoading, setSuggestionsLoading] = useAtom(atoms.suggestionsLoading);

  return (
    <div className="mt-6 hidden max-w-[320px] flex-grow lg:block">
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center">
          <Link href={`/${userDetails.displayName}`}>
            <a>
              {userDetails.photoURL ? (
                <Image
                  className="h-14 w-14 cursor-pointer select-none rounded-full object-cover"
                  src={userDetails.photoURL}
                  alt="avatar"
                  width="56"
                  height="56"
                />
              ) : (
                <div className="h-14 w-14">
                  <ProfilePicSVG strokeWidth="1" />
                </div>
              )}
            </a>
          </Link>
          <Link href={`/${userDetails.displayName}`}>
            <a>
              <p className="ml-5 cursor-pointer text-sm font-semibold">
                {userDetails.displayName}
              </p>
            </a>
          </Link>
        </div>
        <Link href={`/${userDetails.displayName}`}>
          <a>
            <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
              Your profile
            </p>
          </a>
        </Link>
      </div>
      <div className="pt-5">
        <div className="flex items-center justify-between pb-2">
          <p className="text-sm font-semibold text-[#818181]">User Spotlight</p>
          <Link href="/Explore">
            <a>
              <p className="cursor-pointer text-xs font-semibold">
                See all users
              </p>
            </a>
          </Link>
        </div>
        <div className={`${suggestionsLoading ? 'fixed opacity-0' : ''}`}>
          {spotlightUsers.map((spotlightUserDetails) => (
            <div key={spotlightUserDetails?.userId || 'error'} className="flex items-center justify-between py-2">
              {spotlightUserDetails ? (
                <div>
                  <Link href={`/${spotlightUserDetails.username}`}>
                    <a>
                      <ProfilePicSVG strokeWidth="2" />
                    </a>
                  </Link>
                  <div>
                    <Link href={`/${spotlightUserDetails.username}`}>
                      <a>
                        <p className="cursor-pointer text-xs font-semibold">
                          {spotlightUserDetails.username}
                        </p>
                      </a>
                    </Link>
                    <p className="text-xs text-[#818181]">
                      Followed by {spotlightUserDetails.followers?.length || 0}{' '}
                      {spotlightUserDetails.followers && spotlightUserDetails.followers.length === 1 ? 'user' : 'users'}
                    </p>
                  </div>
                </div>
              ) : (
                <div>Error: User details not available</div>
              )}
              <Link href={`/${spotlightUserDetails?.username}`}>
                <a>
                  <p className="cursor-pointer text-xs font-semibold text-[#0095f6]">
                    Profile
                  </p>
                </a>
              </Link>
            </div>
          ))}
        </div>
        {suggestionsLoading && <LoadingSuggestions />}
      </div>
    </div>
  );
}

export default UserSuggestions;
