'use client';
import * as PortOne from "@portone/browser-sdk/v2";
import DeletePostButton from '@compoents/components/posts/Interaction/Delete-button';
import styles from './ProductDetailContainers.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { memberPay, completePay } from "@compoents/util/payment-util";

import { useState } from 'react';
import PutDetailbutton from '@compoents/components/posts/Interaction/Edit-button';


export default function PostDetailContainers({ productId, postpage, post, postList, accessToken }) {
  
  const [purchases, setPurchase] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handlePurchase = async () => {

    const currentDate = new Date().toISOString().split('T')[0];
    setCreatedAt(currentDate);
    
    if (!accessToken) {
      alert("로그인이 필요합니다. 로그인 창으로 이동합니다.");
      window.location.href = "/user/login";
      return;
    }

    const paymentData = {
      total_point: post.price,
      payments_list: [
        {
          product_name: post.productName,
          product_id: parseInt(productId),
          product_point: post.price,
          seller: post.userEmail,
          purchase_at: createdAt
        }
      ]
    };
    const response = await memberPay(accessToken, paymentData);
    setPurchase(response);
    const point = response.point;
    console.log(response);
    if (response.charge === true) { 
      const confirmPurchase = window.confirm(`${response.message} ${response.point} 만큼 충전하시겠습니까?`);
      if (confirmPurchase) {
        setPurchase(prevPurchase => {
          if (prevPurchase.point !== '') {
            handleSetPoint(point); 
          }
          return prevPurchase;
        });
      }
  } else { 
    alert(response.message)
  }

  };

  const handleSetPoint = async (point) => {
    setPurchase();
    const currentDate = new Date().toISOString().split('T')[0]; 
    setCreatedAt(currentDate);
    console.log(currentDate)

    const response = await PortOne.requestPayment({
      storeId: "store-8c143d19-2e6c-41e0-899d-8c3d02118d41",
      channelKey: "channel-key-0c38a3bf-acf3-4b38-bf89-61fbbbecc8a8",
      paymentId: `${crypto.randomUUID()}`, 
      orderName: 'point 충전', 
      totalAmount: point, 
      currency: "CURRENCY_KRW",
      payMethod: "EASY_PAY",
      redirectUrl: `http://localhost:3000`,
    });
    if (response.code != null) {
      return alert(response.message);
    } 
    
    

    const validationData = {
      payment_id: response.paymentId,
      total_point: point,
      created_at: createdAt,
      payments_list: [
        {
          product_id: parseInt(productId),
          product_point: post.price,
          seller: post.userEmail,
          purchase_at: createdAt
        }
      ]
    };
    const Endresponse = await completePay(accessToken, validationData);

    console.log(Endresponse);
    if (Endresponse.charge == true) {
      alert(Endresponse.message);
    } else {
      alert(Endresponse.message);
    }
    
  }

  return (
    <>
      <DeletePostButton postpage={postpage} productId={productId} />
      <PutDetailbutton postpage={postpage} productId={productId} accessToken={accessToken} />
        <div className={styles.postForm}>
          <div className={styles.productCtr}>
            <Image src={post.imageProduct} alt='상품 이미지' width={600} height={600} className={styles.productImg} />
          </div>
          <div className={styles.profiles}>
            <Image src={post.userProfile} alt='프로필 이미지' width={78} height={78} className={styles.ProImg} />
            <p className={styles.nickNames}>{post.nickName}</p>
          </div>
          <div className={styles.verticalLine}></div>
          <div className={styles.prdName}>{post.productName}</div>
          <div className={styles.price}>{post.price}원</div>
          <div className={styles.buttons}>
            <button className={styles.like}>좋아요 ♡</button>
            <button className={styles.buy} onClick={handlePurchase} >구매하기</button>
          </div>
          {postList.productList && postList.productList.length > 0 && (
            <>
          <div className={styles.anotherLine}></div>
          <div>
            <p className={styles.recomePrd}>추천 상품</p>
            <ul className={styles.postsGrid}>
              {postList && postList.productList.map((posts) => (
                <div key={posts.productId} className={styles.postItem}>
                  <Link href={`/${postpage}/${productId}`} style={{ textDecoration: "none" }}>
                  <div><Image src={posts.imageProduct || '/defaultImg.jpg'} alt="상품" width={350} height={350} className={styles.ListImgs}/></div>
                  <div className={styles.ListprdName}>{posts.productName}</div>
                  <div className={styles.ListPrice}>{posts.price}원</div>
                  </Link>
                </div>
              ))}
            </ul>
          </div> 
          </>
          )}
        </div>
        
    </>
  );
}
