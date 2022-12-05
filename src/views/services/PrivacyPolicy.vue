<template>
  <div class="page-wrapper page-service">
    <main>
      <div class="container">
        <section class="section-breadcrumbs">
          <Breadcrumbs />
        </section>
      </div>

      <section class="section-header">
        <div class="container">
          <h1 class="section-name-h1">Privacy Policy</h1>
          <!-- <h3 class="section-name-h3">Frequently Asked Question</h3> -->
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-block">
              Octogamex.com website administration is obliged to maintain your privacy on
              the Internet. We pay great attention to securing the data you provided to
              us. The purposes, for which we collect your personal data are:
              <ul>
                <li>to provide users with services</li>
                <li>to improve our service</li>
                <li>
                  to communicate with visitors to this site, newsletters, online sales
                </li>
                <li>to present the information requested by the user</li>
                <li>to provide services associated with the website's specialization</li>
                <li>to provide the user with customer support</li>
                <li>
                  to protect the security of our services, detect and prevent fraud,
                  comply with legal requirements
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">Personal Data Storage and Processing</div>
            <div class="exposition-block">
              We collect and process your personal data only with your willing consent.
              With your permission, we can collect and process the following data:
              <ul>
                <li>
                  <b>Identification information:</b> name and surname, date of birth,
                  e-mail address, phone number, home address, geolocation data
                </li>
                <li>
                  <b>Transaction information:</b> public blockchain data, personal
                  information published on the blockchain (digital wallet identifications,
                  IP addresses)
                </li>
                <li>
                  <b>Financial information:</b> bank card information, routing number,
                  credit card number, debit card number
                </li>
                <li>
                  <b>Additional information:</b> social media account information,
                  personal photos, correspondence, data usage, device information.
                </li>
              </ul>
              Collection and processing of your personal information is carried out in
              accordance with the laws of the European Union and the United Kingdom.
            </div>
          </div>
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">Data Storage, Alteration, and Removal</div>
            <div class="exposition-block">
              The user, who has provided octogamex.com with their personal data, has the
              right for their alteration and removal, as well as the right to recall the
              agreement to data processing. Time, during which your personal data will be
              stored is: commercial and taxing data storage time. After finishing with the
              processing of your personal data, the website's administration will
              permanently delete it. 
              <br/>
              To access your personal data, you can contact the
              administration at: <a href="#">support@octogamex.com</a>. We will be able to pass your data
              to a third party only with your willing consent. If the data was transferred
              to a third party, which is not associated with our organization, we cannot
              perform any changes to that data.
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import "./styles.css";

export default {
  components: {
    Breadcrumbs,
  },
};
</script>
