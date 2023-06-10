import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"

import { useQuery } from "@galoymoney/client"
import useSatPrice from "../lib/use-sat-price"

import ParsePayment from "../components/ParsePOSPayment"
import PinToHomescreen from "../components/PinToHomescreen"
import reducer, { ACTIONS } from "./_reducer"
import styles from "./_user.module.css"
import Head from "next/head"




function ReceivePayment() {
  const router = useRouter()
  const { username, memo } = router.query
  const { usdToSats, satsToUsd } = useSatPrice()

  let accountUsername: string
  if (username == undefined) {
    accountUsername = ""
  } else {
    accountUsername = username.toString()
  }

  const manifestParams = new URLSearchParams()
  if (memo) {
    manifestParams.set("memo", memo.toString())
  }

  const { data, error: usernameError } = useQuery.accountDefaultWallet({
    variables: { username: accountUsername },
  })

  const [state, dispatch] = React.useReducer(reducer, {
    currentAmount: "",
    createdInvoice: false,
    walletCurrency: data?.accountDefaultWallet.walletCurrency || "USD",
    username: accountUsername,
    pinnedToHomeScreenModalVisible: false,
  })

  React.useEffect(() => {
    let usd_string = satsToUsd(100000000);
    console.log('usd_string', usd_string);
    if (state.walletCurrency === data?.accountDefaultWallet.walletCurrency) {
      return
    }
    dispatch({
      type: ACTIONS.UPDATE_WALLET_CURRENCY,
      payload: data?.accountDefaultWallet.walletCurrency,
    })
    dispatch({ type: ACTIONS.UPDATE_USERNAME, payload: username })
  }, [state, username, data])


  return (
    <Container className={styles.payment_container}>
      <Head>
        <link
          rel="manifest"
          href={`/api/${username}/manifest?${manifestParams.toString()}`}
          id="manifest"
        />
      </Head>
      {usernameError ? (
        <div className={styles.error}>
          <p>{`${usernameError.message}.`}</p>
          <p>비트코인 비치월렛의 유저이름을 입력해주세요.</p>
          <Link href={"/"}>
            <a onClick={() => localStorage.removeItem("username")}>Back</a>
          </Link>
        </div>
      ) : (
        <>
          <PinToHomescreen
            pinnedToHomeScreenModalVisible={state.pinnedToHomeScreenModalVisible}
            dispatch={dispatch}
          />
          <div className={styles.username_container}>
            {state.createdInvoice && (
              <button onClick={() => dispatch({ type: ACTIONS.BACK })}>
                <Image
                  src="/icons/chevron-left-icon.svg"
                  alt="back button"
                  width="10px"
                  height="12px"
                />
              </button>
            )}
            {/* <p>{`${accountUsername.toLowerCase()}@pay.bbw.sv 계정으로 전송됩니다.`}</p> */}
          </div>
          {/* {memo && <p className={styles.memo}>{`Memo: ${memo}`}</p>} */}

          <ParsePayment
            state={state}
            dispatch={dispatch}
            defaultWalletCurrency={data?.accountDefaultWallet.walletCurrency}
            walletId={data?.accountDefaultWallet.id}
          />
        </>
      )}
    </Container>
  )
}

export default ReceivePayment
