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
          <h1 class="section-name-h1">Terms of Use</h1>
          <!-- <h3 class="section-name-h3">Frequently Asked Question</h3> -->
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">Introduction</div>
            <div class="exposition-block">
              The elephantslab.com website located at https://elephantslab.com/ is a
              copyrighted work belonging to ELEPHANTSLAB LP. Certain features of the Site
              may be subject to additional guidelines, terms, or rules, which will be
              posted on the Site in connection with such features.All such additional
              terms, guidelines, and rules are incorporated by reference into these
              Terms.These Terms of Use describe the legally binding terms and conditions
              that oversee your use of the Site. BY LOGGING INTO THE SITE, YOU ARE BEING
              COMPLIANT THAT THESE TERMS and you represent that you have the authority and
              capacity to enter into these Terms. YOU SHOULD BE AT LEAST 18 YEARS OF AGE
              TO ACCESS THE SITE. IF YOU DISAGREE WITH ALL OF THE PROVISION OF THESE
              TERMS, DO NOT LOG INTO AND/OR USE THE SITE.These terms require the use of
              arbitration Section 10.2 on an individual basis to resolve disputes and also
              limit the remedies available to you in the event of a dispute.
            </div>
          </div>
        </div>
      </section>
      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">Access to the Site</div>
            <div class="exposition-block">
              Subject to these Terms. ElephantsLab grants you a non-transferable,
              non-exclusive, revocable, limited license to access the Site solely for your
              own personal, noncommercial use.
              <br />
              Certain Restrictions. The rights approved to you in these Terms are subject
              to the following restrictions: (a) you shall not sell, rent, lease,
              transfer, assign, distribute, host, or otherwise commercially exploit the
              Site; (b) you shall not change, make derivative works of, disassemble,
              reverse compile or reverse engineer any part of the Site; (c) you shall not
              access the Site in order to build a similar or competitive website; and (d)
              except as expressly stated herein, no part of the Site may be copied,
              reproduced, distributed, republished, downloaded, displayed, posted or
              transmitted in any form or by any means unless otherwise indicated, any
              future release, update, or other addition to functionality of the Site shall
              be subject to these Terms. All copyright and other proprietary notices on
              the Site must be retained on all copies thereof.ElephantsLab reserves the
              right to change, suspend, or cease the Site with or without notice to you.
              You approved that the ElephantsLab will not be held liable to you or any
              third-party for any change, interruption, or termination of the Site or any
              part.
              <br />
              No Support or Maintenance. You agree that the ElephantsLab will have no
              obligation to provide you with any support in connection with the
              Site.Excluding any User Content that you may provide, you are aware that all
              the intellectual property rights, including copyrights, patents, trademarks,
              and trade secrets, in the Site and its content are owned by ElephantsLab or
              ElephantsLab's suppliers. Note that these Terms and access to the Site do
              not give you any rights, title or interest in or to any intellectual
              property rights, except for the limited access rights expressed in Section
              2.1. ElephantsLab and its suppliers reserve all rights not granted in these
              Terms.
            </div>
          </div>
        </div>
      </section>

      <section class="section-service-exposition">
        <div class="container">
          <div class="exposition-container">
            <div class="exposition-name">Third-Party Links & Ads. Other Users</div>
            <div class="exposition-block">
              Third-Party Links & Ads. The Site may contain links to third-party websites
              and services, and/or display advertisements for third-parties. Such
              Third-Party Links & Ads are not under the control of ElephantsLab, and
              ElephantsLab is not responsible for any Third-Party Links & Ads.
              ElephantsLab provides access to these Third-Party Links & Ads only as a
              convenience to you, and does not review, approve, monitor, endorse, warrant,
              or make any representations with respect to Third-Party Links & Ads.
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
  mounted(){
    window.scrollTo(0, 0);
  }
};
</script>
