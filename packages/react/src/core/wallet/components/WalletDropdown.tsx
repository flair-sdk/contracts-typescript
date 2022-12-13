import { classNames } from '@flair-sdk/common';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import React, { Fragment } from 'react';
import { useCopyToClipboard } from 'react-use';
import { useAccount, useBalance, useNetwork } from 'wagmi';

import { BareComponentProps } from '../../../common';
import { CryptoUnits, CryptoValue } from '../../crypto-currency';
import { DisconnectButton } from './DisconnectButton';
import { WalletComponentWrapper } from './WalletComponentWrapper';
import { WalletProfile, WalletProfileProps } from './WalletProfile';

type Props = BareComponentProps & {
  className?: string;
  wrapperClassName?: string;
  walletProfileProps?: WalletProfileProps;
};

export const WalletDropdown = ({
  as,
  className,
  wrapperClassName,
  walletProfileProps,
}: Props) => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
    formatUnits: 'ether',
    watch: false,
  });
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <WalletComponentWrapper
      as={as}
      className={classNames('wallet-dropdown-wrapper', wrapperClassName)}
    >
      <Menu
        as="div"
        className={classNames(
          `wallet-dropdown-menu relative inline-block`,
          className,
        )}
      >
        <div>
          <Menu.Button className="wallet-dropdown-button max-w-xs rounded-full flex gap-2 items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 p-2 lg:rounded-md">
            <WalletProfile
              className="flex gap-2 items-center"
              {...walletProfileProps}
            />
            <ChevronDownIcon
              className="wallet-dropdown-icon flex-shrink-0 h-5 w-5 text-gray-400 block"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="wallet-dropdown-items origin-top-right absolute z-10 right-0 mt-2 w-auto rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="wallet-dropdown-header px-4 py-3">
              <div className="wallet-dropdown-info--address">
                <div className="wallet-dropdown-address-label text-xs capitalize text-gray-400">
                  Wallet Address
                </div>
                <div
                  className="wallet-dropdown-address-value text-sm font-medium text-gray-900 cursor-pointer"
                  onClick={(e) => {
                    address && copyToClipboard(address);

                    const selection =
                      typeof window !== 'undefined'
                        ? window?.getSelection()
                        : undefined;
                    const range = document.createRange();
                    range.selectNodeContents(e.currentTarget);
                    selection?.removeAllRanges();
                    selection?.addRange(range);
                  }}
                >
                  {address?.slice(0, 4)}
                  <span className="text-[6px]">{address?.slice(4, -4)}</span>
                  {address?.slice(-4)}
                </div>
              </div>
              {balance ? (
                <div className="wallet-dropdown-info--balance">
                  <div className="wallet-dropdown-balance-label text-xs capitalize text-gray-400 mt-3">
                    Balance
                  </div>
                  <div className="wallet-dropdown-balance-value text-sm font-medium text-gray-900">
                    <CryptoValue
                      symbol={chain?.nativeCurrency?.symbol || balance.symbol}
                      unit={CryptoUnits.WEI}
                      value={balance.value}
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <Menu.Item as="div">
              {({ active }: any) => (
                <a
                  href={`https://buy.ramp.network/?userAddress=${address}&defaultAsset=${chain?.nativeCurrency?.symbol}`}
                  target={'_blank'}
                  className={classNames(
                    'wallet-dropdown-item wallet-dropdown-item--buy',
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                  rel="noreferrer"
                >
                  Buy {chain?.nativeCurrency?.symbol || 'Crypto'}
                </a>
              )}
            </Menu.Item>
            <Menu.Item as="div">
              {({ active }: any) => (
                <DisconnectButton
                  className={classNames(
                    'wallet-dropdown-item wallet-dropdown-item--disconnect',
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 w-full text-left',
                  )}
                />
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </WalletComponentWrapper>
  );
};
